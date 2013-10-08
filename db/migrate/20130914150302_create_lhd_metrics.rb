class CreateLhdMetrics < ActiveRecord::Migration
  def change
    create_table :lhd_metrics do |t|
      t.decimal :value
      t.references :lhd, index: true
      t.references :metric, index: true

      t.timestamps
    end
  end
end
