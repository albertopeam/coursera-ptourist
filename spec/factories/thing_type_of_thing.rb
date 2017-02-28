FactoryGirl.define do

  factory :thing_type_of_thing do
    thing { FactoryGirl.create(:thing) }
    type_of_thing { FactoryGirl.create(:type_of_thing) }
  end

end
