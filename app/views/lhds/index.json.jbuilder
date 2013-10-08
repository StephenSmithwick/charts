json.array!(@lhds) do |lhd|
  json.extract! lhd, :id, :name, :long_name
  json.url lhd_url(lhd, format: :json)
end
