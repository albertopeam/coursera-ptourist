class Thing < ActiveRecord::Base
  include Protectable
  validates :name, :presence=>true

  has_many :thing_images, inverse_of: :thing, dependent: :destroy
  has_many :thing_type_of_things
  has_many :type_of_things, through: :thing_type_of_things

  scope :not_linked, ->(image) { where.not(:id=>ThingImage.select(:thing_id)
                                                          .where(:image=>image)) }

  scope :not_linked_to_type, ->(type) {
    where.not(:id=>ThingTypeOfThing.select(:thing_id).where(:type_of_thing=>type))
  }
end
