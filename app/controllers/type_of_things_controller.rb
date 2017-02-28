class TypeOfThingsController < ApplicationController
  include ActionController::Helpers
  helper ThingsHelper
  before_action :authenticate_user!, only: [:index, :show, :linkable_things]
  before_action :set_type_of_thing, only: [:show]
  after_action :verify_authorized

  def index
    authorize(TypeOfThing)
    @types_of_thing = TypeOfThing.all
  end

  def show
    authorize(@type_of_thing)
  end

  def linkable_things
    authorize(Thing, :get_linkables?)
    type_of_thing = TypeOfThing.find(params[:type_of_thing_id])
    @things = Thing.not_linked_to_type(type_of_thing)
    render "things/index"
  end

  private
    def set_type_of_thing
      @type_of_thing = TypeOfThing.find(params[:id])
    end

end
