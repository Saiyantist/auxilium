Rails.application.routes.draw do
  devise_for :users,
              controllers: {
                sessions: 'users/sessions',
                registrations: 'users/registrations'
              }
  namespace :auth do
    get 'me', to: 'users#me'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Setup Action Cable
  mount ActionCable.server => '/cable'

  get '/healthz', to: proc { [200, {}, ['OK']] }

  # Defines the root path route ("/")
  # root "posts#index"
  
  # API routes
  namespace :api do
    namespace :v1 do
      resources :tickets 
    end
  end
end
