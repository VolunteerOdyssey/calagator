Calagator::Application.routes.draw do
  match 'hello' => 'site#hello'

  match 'about' => 'site#about'

  match 'opensearch.:format' => 'site#opensearch'
  match 'defunct' => 'site#defunct'

  match 'admin' => 'admin#index'
  get "admin/index"
  get "admin/events"
  match "lock_event" => "admin#lock_event", :only => :post

  resources :events do
    collection do
      post :squash_many_duplicates
      get :search
      get :duplicates
      match 'tag/:tag', via: :get, to: :search, as: :tag
    end

    member do
      get :clone
    end
  end

  resources :sources do
    collection do
      post :import
    end
  end

  resources :venues do
    collection do
      post :squash_many_duplicates
      get :map
      get :duplicates
      get :autocomplete
      match 'tag/:tag', via: :get, to: :search, as: :tag
    end
  end

  resources :organizations do
    put :regenerate_permalink

    collection do
      post :squash_many_duplicates
      get :duplicates
      get :autocomplete
      match 'tag/:tag', via: :get, to: :search, as: :tag
    end
  end

  resources :versions, :only => [:edit]
  resources :changes, :controller => 'paper_trail_manager/changes'
  match 'recent_changes' => redirect("/changes")
  match 'recent_changes.:format' => redirect("/changes.%{format}")

  match 'css/:name' => 'site#style'
  match 'css/:name.:format' => 'site#style'

  match '/' => 'site#index', :as => :root
  match '/index' => 'site#index'
  match '/index.:format' => 'site#index'

  get '/organization_sessions/destroy'    => 'organization_logins#destroy', as: :organization_logout
  get '/organization_sessions/:permalink' => 'organization_logins#create',  as: :organization_login
end
