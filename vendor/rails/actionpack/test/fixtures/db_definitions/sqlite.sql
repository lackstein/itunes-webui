xml.p "Hello world!">eRecord::Base
  has_one :mascot
  attr_protected :rating
  set_sequence_name :companies_nonstd_seq

  validates_presence_of :name
  def validate
    errors.add('rating', 'rating should not be 2') if rating == 2
  end  
end   super(nil, StringIO.new(data))
    end
  end

  class TestController < ActionController::Base
    session :off

    def assign_parameters
      if params[:full]
        render :text => dump_params_keys
      else
        render :text => (params.keys - ['controller', 'action']).sort.join(", ")
      end
    end

    def dump_params_keys(hash=params)
      hash.keys.sort.inject("") do |s, k|
        value = hash[k]
        value = Hash === value ? "(#{dump_params_keys(value)})" : ""
        s << ", " unless s.empty?
        s << "#{k}#{value}"
      end
    end

    def rescue_action(e) raise end
  end
  
  def setup
    @controller = TestController.new
    @default_param_parsers = ActionController::Base.param_parsers.dup
  end

  def teardown
    ActionController::Base.param_parsers = @default_param_parsers
  end

  def test_check_parameters
 