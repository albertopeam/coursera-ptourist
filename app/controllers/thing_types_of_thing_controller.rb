class ThingTypesOfThingController < ApplicationController

  include ActionController::Helpers
  helper ThingsHelper
  before_action :set_type_of_thing, only: [:create, :destroy]
  before_action :set_thing_type_of_thing, only: [:destroy]
  wrap_parameters :thing, include: [:thing_id]

  def create
    @thing = Thing.find(params[:thing_id])
    @type_of_thing.thing_type_of_things.build(thing: @thing)
    if @type_of_thing.save
      render :show, status: :created
    else
      render json: {errors: @type_of_thing.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @thing_type_of_thing.blank?
      render json:{}, status: :not_found
    else
      @thing_type_of_thing.first.destroy
      head :no_content
    end
  end

  private
    def set_type_of_thing
      @type_of_thing = TypeOfThing.find(params[:id])
    end

    def set_thing_type_of_thing
      @thing_type_of_thing = ThingTypeOfThing.where(thing_id: params[:thing_id], type_of_thing_id: params[:id])
    end

    def whitelist
      params.require(:thing).permit(:thing_id)
    end
end
