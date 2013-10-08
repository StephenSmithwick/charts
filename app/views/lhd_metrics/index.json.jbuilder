json.array!(@lhd_metrics) do |lhd_metric|
  json.extract! lhd_metric, :id, :value, :percentage, :lhd_id, :metric_id
  json.lhd_name lhd_metric.lhd.name
  json.lhd_long_name lhd_metric.lhd.long_name
  json.url lhd_metric_url(lhd_metric, format: :json)
end
