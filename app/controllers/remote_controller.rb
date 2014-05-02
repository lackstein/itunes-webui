class RemoteController < ApplicationController
  include Appscript
  
  def play
    @track = app('iTunes').playlists[2].tracks[its.name.eq(params[:track])].get[0]
    app('iTunes').play @track
    
    render :inline => "Playing!"
  end

  def pause
    app('iTunes').playpause
    
    render :inline => "Paused!"
  end

  def currently
    begin
      @track = app('iTunes').current_track.get
      @name = @track.name.get
      @time = @track.time.get
      @album = @track.album.get
      @year = @track.year.get
      @artist = @track.artist.get
      @rating = @track.rating.get
      @genre = @track.genre.get
    
      respond_to do |format|
        format.html # index.html.erb
        format.xml  { render :xml => @posts }
      end
    rescue Exception => e
      respond_to do |format|
        format.html { render :inline => "iTunes is paused." }
        format.xml { render :inline => '<?xml version="1.0" encoding="UTF-8"?><track><error>Could not get information from iTunes</error></track>' }
      end
    end
  end

  def next
    app('iTunes').next_track
    
    render :inline => "Done!"
  end

  def last
    app('iTunes').previous_track
    
    render :inline => "Done!"
  end
end
