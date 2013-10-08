LhdCharts::Application.routes.draw do
  resources :lhd_metrics
  resources :metrics
  resources :lhds
  resources :charts

  root 'charts#index'
end
