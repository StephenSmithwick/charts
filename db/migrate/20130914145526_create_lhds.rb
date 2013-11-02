class CreateLhds < ActiveRecord::Migration
  def change
    create_table :lhds do |t|
      t.string :name
      t.string :long_name
      t.string :path
      t.decimal :x
      t.decimal :y

      t.timestamps
    end
  end
end
