require 'rails_helper'

RSpec.describe "TypesOfThing", type: :request do
  include_context "db_cleanup_each"

  describe "access to type of thing resource" do
    let(:type_of_thing) { FactoryGirl.create(:type_of_thing) }

    context "caller is anonymous" do
      it "cannot list types of thing" do
        jget type_of_things_path
        expect(response).to have_http_status(:forbidden)
        payload=parsed_body
        expect(payload).to have_key("errors")
        expect(payload["errors"]).to have_key("full_messages")
        expect(payload["errors"]["full_messages"][0]).to include("Anonymous user not authorized")
      end

      it "cannot show types of thing" do
        jget type_of_thing_path(type_of_thing)
        expect(response).to have_http_status(:forbidden)
        payload=parsed_body
        expect(payload).to have_key("errors")
        expect(payload["errors"]).to have_key("full_messages")
        expect(payload["errors"]["full_messages"][0]).to include("Anonymous user not authorized")
      end
    end

    context "caller is authenticated" do
      let!(:type_of_things) { (1..2).map {|idx| FactoryGirl.create(:type_of_thing) } }
      let(:user) { login signup(FactoryGirl.attributes_for(:user)) }

      it "can list types of thing" do
        user
        jget type_of_things_path
        expect(response).to have_http_status(:ok)
        payload=parsed_body
        expect(payload.count).to eq(type_of_things.count)
        expect(payload[0]["id"]).to eq(type_of_things[0].id)
        expect(payload[0]["name"]).to eq(type_of_things[0].name)
        expect(payload[1]["id"]).to eq(type_of_things[1].id)
        expect(payload[1]["name"]).to eq(type_of_things[1].name)
      end

      it "can show types of thing" do
        user
        type_of_thing = type_of_things.first
        jget type_of_thing_path(type_of_thing)
        expect(response).to have_http_status(:ok)
        payload=parsed_body
        expect(payload["id"]).to eq(type_of_thing.id)
        expect(payload["name"]).to eq(type_of_thing.name)
      end
    end
  end
end
