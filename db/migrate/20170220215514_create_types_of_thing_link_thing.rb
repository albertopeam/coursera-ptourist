class CreateTypesOfThingLinkThing < ActiveRecord::Migration
  def change
    create_table :thing_type_of_things do |t|
      t.belongs_to :thing, {index: true, foreign_key: true, null:false}
      t.belongs_to :type_of_thing, {index: true, foreign_key: true, null:false}
    end
    add_index :thing_type_of_things, [:thing_id , :type_of_thing_id] , :unique => true
  end
end
