class Pageview
  attr_reader :app, :tracking_id

  def initialize(app, tracking_id)
    @app         = app
    @tracking_id = tracking_id
  end

  def call(env)
    # Find or create a new session_uuid
    existing_session_uuid = get_session_uuid(env)
    session_uuid = existing_session_uuid || SecureRandom.uuid

    # Setup a tracker instance, useful for tracking other events inside the app
    env['TRACKER'] = tracker = Staccato.tracker(tracking_id, session_uuid, ssl: true)

    # Setup a pageview intsance, allow downstream to set properties
    env['PAGEVIEW'] = pageview = tracker.build_pageview(
      host:          env['HTTP_HOST'] || env['SERVER_NAME'],
      path:          env['PATH_INFO'],
      referrer:      env['HTTP_REFERER'],
      user_agent:    env['HTTP_USER_AGENT'],
      user_ip:       env['REMOTE_ADDR'],
      user_language: env['HTTP_ACCEPT_LANGUAGE']
    )

    status, headers, body = app.call(env)

    # Store the session id in the cookie
    if existing_session_uuid.blank?
      headers = set_session_uuid(session_uuid, headers)
    end

    # Report successes to GA
    if (200..299).cover?(status.to_i)
      pageview.track! rescue nil
    end

    [status, headers, body]
  end

  private

  def get_session_uuid(env)
    return nil unless env['HTTP_COOKIE']
    cookie = Rack::Utils.parse_query(env['HTTP_COOKIE'], ';,')['_odyssey_session_uuid']
    cookie = (cookie.is_a?(Array) ? cookie.first : cookie)
    cookie.is_a?(Hash) ? cookie[:value] : cookie
  end

  def set_session_uuid(uuid, headers)
    Rack::Utils.set_cookie_header!(headers, '_odyssey_session_uuid',
      value:   uuid,
      path:    "/",
      expires: 2.years.from_now
    )
    headers
  end
end
