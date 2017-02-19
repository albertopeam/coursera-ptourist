class TypeOfThing < ActiveRecord::Base
  validates :name, presence: true
end
