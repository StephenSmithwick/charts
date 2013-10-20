# encoding: UTF-8
ActiveRecord::Schema.define(version: 20130914150302) do

  create_table "lhd_metrics", force: true do |t|
    t.decimal  "value", precision: 8, scale: 3
    t.decimal  "percentage", null: false, precision: 8, scale: 3
    t.integer  "lhd_id"
    t.integer  "metric_id"
  end

  add_index "lhd_metrics", ["lhd_id"], name: "index_lhd_metrics_on_lhd_id"
  add_index "lhd_metrics", ["metric_id"], name: "index_lhd_metrics_on_metric_id"

  create_table "lhds", force: true do |t|
    t.string   "name"
    t.string   "long_name"
    t.string   "path"
  end

  create_table "metrics", force: true do |t|
    t.string   "name"
    t.text     "description"
  end

end
