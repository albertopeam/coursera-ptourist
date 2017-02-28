require 'rails_helper'

RSpec.describe "TypesOfThing", type: :request do
  include_context "db_cleanup_each"

  describe "create/destroy relationship between thing - type of thing" do
    context "caller is anonymous" do
      let(:type_of_thing) { FactoryGirl.create(:type_of_thing) }
      let(:thing) { FactoryGirl.create(:thing) }

      it "cannot create" do
        jpost thing_type_of_things_path(thing), {id: type_of_thing.id}
        expect(response).to have_http_status(:unauthorized)
      end

      it "cannot destroy" do
        jdelete thing_type_of_thing_path(thing, type_of_thing)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "caller is authenticated" do
      let(:account) { FactoryGirl.create(:user) }
      let(:thing_type_of_thing) { FactoryGirl.create(:thing_type_of_thing) }
      let(:type_of_thing) { FactoryGirl.create(:type_of_thing) }
      let(:thing) { FactoryGirl.create(:thing) }

      it "cannot create if not organizer" do
        login account
        jpost thing_type_of_things_path(thing_type_of_thing.thing), {id: thing_type_of_thing.type_of_thing.id}
        payload=parsed_body
        expect(response).to have_http_status(:forbidden)
      end

      it "can create if is thing organizer" do
        account.add_role(Role::ORGANIZER, Thing)
        account.save!
        login account
        jpost thing_type_of_things_path(thing), {id: type_of_thing.id}
        payload=parsed_body
        expect(response).to have_http_status(:created)
        expect(payload["types_of_thing"].count).to eq(1)
      end

      it "can destroy if destroyer is thing organizer" do
        account.add_role(Role::ORGANIZER, Thing)
        account.save!
        login account
        jdelete thing_type_of_thing_path(thing_type_of_thing.thing.id, thing_type_of_thing.type_of_thing.id)
        expect(response).to have_http_status(:no_content)
      end

    end
  end
end
