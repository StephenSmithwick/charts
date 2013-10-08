class LhdMetricsController < ApplicationController
  before_action :set_lhd_metric, only: [:show, :edit, :update, :destroy]

  # GET /lhd_metrics
  # GET /lhd_metrics.json
  def index
    if params.key? :metric_id
      @lhd_metrics = LhdMetric.where(metric_id: params[:metric_id]).includes(:lhd).entries
    else
      @lhd_metrics = LhdMetric.includes(:lhd).entries
    end
  end

  # GET /lhd_metrics/1
  # GET /lhd_metrics/1.json
  def show
  end

  # GET /lhd_metrics/new
  def new
    @lhd_metric = LhdMetric.new
  end

  # GET /lhd_metrics/1/edit
  def edit
  end

  # POST /lhd_metrics
  # POST /lhd_metrics.json
  def create
    @lhd_metric = LhdMetric.new(lhd_metric_params)

    respond_to do |format|
      if @lhd_metric.save
        format.html { redirect_to @lhd_metric, notice: 'Lhd metric was successfully created.' }
        format.json { render action: 'show', status: :created, location: @lhd_metric }
      else
        format.html { render action: 'new' }
        format.json { render json: @lhd_metric.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lhd_metrics/1
  # PATCH/PUT /lhd_metrics/1.json
  def update
    respond_to do |format|
      if @lhd_metric.update(lhd_metric_params)
        format.html { redirect_to @lhd_metric, notice: 'Lhd metric was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @lhd_metric.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lhd_metrics/1
  # DELETE /lhd_metrics/1.json
  def destroy
    @lhd_metric.destroy
    respond_to do |format|
      format.html { redirect_to lhd_metrics_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lhd_metric
      @lhd_metric = LhdMetric.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lhd_metric_params
      params.require(:lhd_metric).permit(:percentage, :value, :lhd_id, :metric_id)
    end
end
