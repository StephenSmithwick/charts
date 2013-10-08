class LhdMetric < ActiveRecord::Base
  belongs_to :lhd
  belongs_to :metric

  def self.entries 
    order('metric_id', 'lhd_id')
  end
end
