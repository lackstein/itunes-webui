ActionController::Routing::Routes.draw do |map|
  map.root :controller => 'library'
  map.library 'library', :controller => 'library', :action => 'list'
  map.library_formatted 'library.:format', :controller => 'library', :action => 'list'
  map.playlists 'playlists/', :controller => 'playlists', :action => 'index'
  map.playlists_formatted 'playlists.:format', :controller => 'playlists', :action => 'index'
  map.artists 'artists/', :controller => 'artists', :action => 'index'
  map.artists_formatted 'artists.:format', :controller => 'artists', :action => 'index'
  map.albums 'albums/', :controller => 'albums', :action => 'index'
  map.albums_formatted 'albums.:format', :controller => 'albums', :action => 'index'
  map.albums_search_formatted 'albums/:action/:search.:format', :controller => 'albums', :requirements => { :search => /.+/ }
  map.albums_search 'albums/:action/:search', :controller => 'albums', :requirements => { :search => /.+/ }
  map.tracks_formatted 'tracks/:action/:search.:format', :controller => 'tracks', :requirements => { :search => /.+/ }
  map.tracks 'tracks/:action/:search', :controller => 'tracks', :requirements => { :search => /.+/ }
  map.track_formatted 'track/:search.:format', :controller => 'tracks', :action => 'info', :requirements => { :search => /.+/ }
  map.track 'track/:search', :controller => 'tracks', :action => 'info', :requirements => { :search => /.+/ }
  
  # Remote Control
  map.play 'play/:track', :controller => 'remote', :action => 'play'
  map.playpause 'playpause', :controller => 'remote', :action => 'pause'
  map.currently 'currently', :controller => 'remote', :action => 'currently'
  map.currently_formatted 'currently.:format', :controller => 'remote', :action => 'currently'
  map.next 'next', :controller => 'remote', :action => 'next'
  map.last 'last', :controller => 'remote', :action => 'last'

  # Install the default routes as the lowest priority.
  #map.connect ':controller/:action/:id'
  #map.connect ':controller/:action/:id.:format'
end
