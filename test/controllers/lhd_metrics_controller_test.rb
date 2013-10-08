require 'test_helper'

class LhdMetricsControllerTest < ActionController::TestCase
  setup do
    @lhd_metric = lhd_metrics(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lhd_metrics)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lhd_metric" do
    assert_difference('LhdMetric.count') do
      post :create, lhd_metric: { lhd_id: @lhd_metric.lhd_id, metric_id: @lhd_metric.metric_id, value: @lhd_metric.value }
    end

    assert_redirected_to lhd_metric_path(assigns(:lhd_metric))
  end

  test "should show lhd_metric" do
    get :show, id: @lhd_metric
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lhd_metric
    assert_response :success
  end

  test "should update lhd_metric" do
    patch :update, id: @lhd_metric, lhd_metric: { lhd_id: @lhd_metric.lhd_id, metric_id: @lhd_metric.metric_id, value: @lhd_metric.value }
    assert_redirected_to lhd_metric_path(assigns(:lhd_metric))
  end

  test "should destroy lhd_metric" do
    assert_difference('LhdMetric.count', -1) do
      delete :destroy, id: @lhd_metric
    end

    assert_redirected_to lhd_metrics_path
  end
end
