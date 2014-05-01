require_relative '../spec_helper'

describe Location do 
    subject { Location.new(latitude: 38.911268, longitude: -77.444243) }    
    its (:latitude)   { should == 38.911268  }
    its (:longitude)  { should == -77.444243 }
   
    let(:airspace) { Location.new(latitude: 38.911268, longitude: -77.444243) }

    let(:latitude) { 38.911268 }
    let(:longitude) { -77.444243 }

  describe '#initialize' do 
    it 'sets the latitude to 0 and longitude to 1' do 
      loc = Location.new(latitude: 0, longitude: 1)
      loc.latitude.should == 0
      loc.longitude.should == 1
    end

    subject { airspace }

    its (:latitude) { should == latitude  }
    its (:longitude)  { should == longitude }
  end

  describe '#near?' do 
    context "when within the specified radius" do 
      subject { airspace.near?(latitude: latitude, longitude: longitude, radius: 10)}
      it { should be_true }
    end

     context "when outside the specified radius" do 
        subject { airspace.near?(latitude: latitude * 10, longitude: longitude * 10, radius: 1)}
        it {should be_false}
     end

     context "when within airspace" do 
      subject { airspace }
      it { should be_near(latitude: latitude, longitude: longitude, radius: 1)}
     end

     context "when outside airspace" do
      subject { airspace }
      it { should_not be_near(latitude: latitude * 10, longitude: longitude * 10, radius: 1)}
     end

     context "when a negative radius is used" do
      it 'Raises an error' do 
          expect { airspace.near?(latitude: latitude, longitude: longitude, radius: -1 )}
          .to raise_error ArgumentError
      end
     end
  end

  describe '#nearest_city' do 
    context 'when coordinates are provided' do 
      subject { Location.new(latitude: 27.7821857, longitude: -82.6404965).nearest_city }
      it { should be_a String  }
    end
  end

end