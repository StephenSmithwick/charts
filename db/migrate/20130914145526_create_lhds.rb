class CreateLhds < ActiveRecord::Migration
  def change
    create_table :lhds do |t|
      t.string :name

      t.timestamps
    end
  end
end
