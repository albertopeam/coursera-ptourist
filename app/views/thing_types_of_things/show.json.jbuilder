json.partial! "things/thing", thing: @thing
json.types_of_thing @thing.type_of_things, partial: 'type_of_things/type_of_thing', as: :type_of_thing
