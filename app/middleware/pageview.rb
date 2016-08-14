class Pageview
  attr_reader :app, :tracking_id

  def initialize(app, tracking_id)
    @app         = app
    @tracking_id = tracking_id
  end

  def call(env)
    session_uuid = get_session_uuid(env)

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

    headers = set_session_uuid(session_uuid, headers)

    if (200..299).cover?(status.to_i)
      pageview.track! rescue nil
    end

    [status, headers, body]
  end

  private

  def get_session_uuid(env)
    get_cookies(env).fetch('_odyssey_session_uuid', SecureRandom.uuid)
  end

  def get_cookies(env)
    return {} unless env['HTTP_COOKIE']
    Rack::Utils.parse_query(env['HTTP_COOKIE'], ';,')
               .each_with_object({}) do |(k,v), hash|
      hash[k] = Array === v ? v.first : v
    end
  end

  def set_session_uuid(uuid, headers)
    Rack::Utils.set_cookie_header!(headers, '_odyssey_session_uuid', uuid)
    headers
  end
end
