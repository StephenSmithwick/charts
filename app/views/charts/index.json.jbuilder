json.array!(@lhd_metrics) do |lhd_metric|
  json.extract! lhd_metric, :id, :value, :lhd_id, :metric_id
  json.url lhd_metric_url(lhd_metric, format: :json)
end
