class ThingTypeOfThing < ActiveRecord::Base
  belongs_to :thing
  belongs_to :type_of_thing

  validates :thing, :type_of_thing, presence: true
  #validates :thing, uniqueness: {:scope => :type_of_thing}
end
