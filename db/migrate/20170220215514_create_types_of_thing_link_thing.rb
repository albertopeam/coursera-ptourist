class CreateTypesOfThingLinkThing < ActiveRecord::Migration
  def change
    create_table :thing_type_of_things do |t|
      t.belongs_to :thing, index: true
      t.belongs_to :type_of_thing, index: true
      t.timestamps
    end
    add_index :thing_type_of_things, [:thing_id , :type_of_thing_id] , :unique => true
  end
end
