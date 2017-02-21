json.partial! "things/thing", thing: @thing
json.types_of_thing @thing.type_of_things, partial: 'types_of_thing/type_of_thing', as: :type_of_thing
