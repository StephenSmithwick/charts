json.array!(@metrics) do |metric|
  json.extract! metric, :id, :name, :description
  json.url metric_url(metric, format: :json)
end
