class ThingTypeOfThing < ActiveRecord::Base
  belongs_to :thing
  belongs_to :type_of_thing
end
