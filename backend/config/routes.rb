Rails.application.routes.draw do
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  
  devise_for :users,
    path: 'api/v1/users',
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  # API routes
  namespace :api do
    namespace :v1 do
      get '/healthz', to: proc { [200, {}, ['OK']] }
      get "/me", to: "me#show"
      post "/login", to: "users/sessions#create"
      delete "/logout", to: "users/sessions#destroy"

      # Setup Action Cable
      mount ActionCable.server => '/cable'

      resources :tickets do
        resources :activities, only: [:index]
        resources :comments, only: %i[index show create update destroy]
      end
    end
  end
end
