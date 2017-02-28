json.id @type_of_thing.id
json.name @type_of_thing.name
json.things(@type_of_thing.things) do |thing|
  json.id thing.id
  json.name thing.name
end
