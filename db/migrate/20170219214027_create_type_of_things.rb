class CreateTypeOfThings < ActiveRecord::Migration
  def change
    create_table :type_of_things do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
