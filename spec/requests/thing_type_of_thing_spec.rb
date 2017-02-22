require 'rails_helper'

RSpec.describe "TypesOfThing", type: :request do
  include_context "db_cleanup_each"

  describe "create/destroy relationship between thing - type of thing" do
    context "caller is anonymous" do
      let!(:type_of_thing) { FactoryGirl.create(:type_of_thing) }
      let!(:thing) { FactoryGirl.create(:thing) }

      it "cannot create" do
        jpost thing_type_of_things_path(thing), {id: type_of_thing.id}
        payload=parsed_body
        expect(response).to have_http_status(:forbidden)
        expect(payload).to have_key("errors")
        expect(payload["errors"]).to have_key("full_messages")
        expect(payload["errors"]["full_messages"][0]).to include("Anonymous user not authorized")
      end

      it "cannot destroy" do
        jdelete thing_type_of_thing_path(thing, type_of_thing)
        expect(response).to have_http_status(:forbidden)
        payload=parsed_body
        expect(payload).to have_key("errors")
        expect(payload["errors"]).to have_key("full_messages")
        expect(payload["errors"]["full_messages"][0]).to include("Anonymous user not authorized")
      end
    end

    context "caller is authenticated" do

    end
  end
end
