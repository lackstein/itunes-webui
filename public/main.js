//
// Function: load()
// Called by HTML body element's onload event when the web application is ready to start
//
function load()
{
    dashcode.setupParts();
    getPlaylists();
    getArtists();
    getAlbums();
    getTracks('playlist', 'My Top Rated');
}

function getLibrary() {
    // Values you provide
    var feed = 'http://24.200.99.51:50202/library.xml';	// The feed to fetch
    var onloadHandler = function() { libraryXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    library = new Array();
}

function getPlaylists() {
    // Values you provide
    var feed = 'http://24.200.99.51:50202/playlists.xml';	// The feed to fetch
    var onloadHandler = function() { playlistsXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    playlists = new Array();
}

function getArtists() {
    // Values you provide
    var feed = 'http://24.200.99.51:50202/artists.xml';	// The feed to fetch
    var onloadHandler = function() { artistsXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    artists = new Array();
}

function getAlbums() {
    // Values you provide
    var feed = 'http://24.200.99.51:50202/albums.xml';	// The feed to fetch
    var onloadHandler = function() { albumsXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    albums = new Array();
}

function getTracks(kind, search, redir) {
    // Values you provide
    var feed = 'http://24.200.99.51:50202/tracks/' + kind + '/' + search + '.xml';	// The feed to fetch
    var onloadHandler = function() { tracksXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    tracks = new Array();
    
    if (redir) {
        // Move forward to the tracks window
        var browser = document.getElementById('browser').object;
        browser.goForward('tracks', search);
    }
}

function getTrackInfo(name) {
    var feed = 'http://24.200.99.51:50202/track/' + name + '.xml';	// The feed to fetch
    var onloadHandler = function() { trackInfoXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    track = new Array();
    
    var browser = document.getElementById('browser').object;
    browser.goForward('track_info', name);
}

function getCurrentTrack() {
    var feed = 'http://24.200.99.51:50202/currently.xml';	// The feed to fetch
    var onloadHandler = function() { currentTrackXML(xmlRequest); };	// The function to call when the feed is loaded; currently calls the XMLHttpRequest load snippet

    // XMLHttpRequest setup code
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = onloadHandler;
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
    current = new Array();
    
    var browser = document.getElementById('browser').object;
    browser.goForward('now_playing', 'Now Playing');
}

function playTrack(name) {
    var feed = 'http://24.200.99.51:50202/play/' + name;
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
}

function playOrPauseTrack() {
    var feed = 'http://24.200.99.51:50202/playpause';
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", feed);
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.send(null);
}

// This object implements the dataSource methods for the list.
var menuDataSource = {
	
	// Sample data for the content of the list. 
	// Your application may also fetch this data remotely via XMLHttpRequest.
	_rowData: ["Library", "Playlists", "Artists", "Albums", "Now Playing"],
	
	// The List calls this method to find out how many rows should be in the list.
	numberOfRows: function() {
		return this._rowData.length;
	},
	
	// The List calls this method once for every row.
	prepareRow: function(rowElement, rowIndex, templateElements) {
		// templateElements contains references to all elements that have an id in the template row.
		// Ex: set the value of an element with id="label".
		if (templateElements.label) {
			templateElements.label.innerText = this._rowData[rowIndex];
		}

		// Assign a click event handler for the row.
		rowElement.onclick = function(event) {
            var row = menuDataSource._rowData[rowIndex];
            var browser = document.getElementById('browser').object; // Replace with id of Browser
            
            if (row == "Library") {
                browser.goForward('library', 'Library');
            } else if (row == "Playlists") {
                browser.goForward('playlists', 'Playlists');
            } else if (row == "Artists") {
                browser.goForward('artists', 'Artists');
            } else if (row == "Albums") {
                browser.goForward('albums', 'Albums');
            } else if (row == "Now Playing") {
                getCurrentTrack();
                //browser.goForward('now_playing', 'Now Playing');
            } else {
                alert("Stop trying to break me :(");
            }
		};
	}
};

// Called when an XMLHttpRequest loads a feed; works with the XMLHttpRequest setup snippet
function libraryXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('tracks').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    library[cnt] = new Array;
                    library[cnt][0] = sibl.data;
                    library[cnt][1] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        libraryDataSource = {
    
            _rowData: library,
    
            // The List calls this method to find out how many rows should be in the list.
            numberOfRows: function() {
                return library.length;
            },
	
            // The List calls this method once for every row.
            prepareRow: function(rowElement, rowIndex, templateElements) {
                // templateElements contains references to all elements that have an id in the template row.
                // Ex: set the value of an element with id="label".
                if (templateElements.libraryName) {
                    templateElements.libraryName.innerText = library[rowIndex][0];
                }

                // Assign a click event handler for the row.
                rowElement.onclick = function(event) {
                    var row = library[rowIndex][0];
                    getTrackInfo(row);
                };
            }
        };
        document.getElementById('loadLibraryText').style.visibility = "hidden";
        document.getElementById('loadLibraryText').style.display = "none";
        document.getElementById('loadLibraryButton').style.visibility = "hidden";
        document.getElementById('loadLibraryButton').style.display = "none";
        document.getElementById('libraryList').object.setDataSource(libraryDataSource);
        document.getElementById('libraryList').object.reloadData;
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
}

function playlistsXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('playlists').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    playlists[cnt] = new Array;
                    playlists[cnt][0] = sibl.data;
                    playlists[cnt][1] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        playlistsDataSource = {
    
            _rowData: playlists,
    
            // The List calls this method to find out how many rows should be in the list.
            numberOfRows: function() {
                return playlists.length;
            },
	
            // The List calls this method once for every row.
            prepareRow: function(rowElement, rowIndex, templateElements) {
                // templateElements contains references to all elements that have an id in the template row.
                // Ex: set the value of an element with id="label".
                if (templateElements.playlistName) {
                    templateElements.playlistName.innerText = playlists[rowIndex][0];
                }

                // Assign a click event handler for the row.
                rowElement.onclick = function(event) {
                    var row = playlists[rowIndex];
                    
                    getTracks('playlist', row[0], true);
                };
            }
        };
        document.getElementById('playlistsList').object.setDataSource(playlistsDataSource);
        document.getElementById('playlistsList').object.reloadData;
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
    return true;
}

function artistsXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('artists').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    artists[cnt] = new Array;
                    artists[cnt][0] = sibl.data;
                    artists[cnt][1] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        artistsDataSource = {
    
            _rowData: artists,
    
            // The List calls this method to find out how many rows should be in the list.
            numberOfRows: function() {
                return artists.length;
            },
	
            // The List calls this method once for every row.
            prepareRow: function(rowElement, rowIndex, templateElements) {
                // templateElements contains references to all elements that have an id in the template row.
                // Ex: set the value of an element with id="label".
                if (templateElements.artistName) {
                    templateElements.artistName.innerText = artists[rowIndex][0];
                }

                // Assign a click event handler for the row.
                rowElement.onclick = function(event) {
                    var row = artists[rowIndex];
                    
                    getTracks('artist', row[0], true);
                };
            }
        };
        document.getElementById('artistsList').object.setDataSource(artistsDataSource);
        document.getElementById('artistsList').object.reloadData;
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
    return true;
}

function albumsXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('albums').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    albums[cnt] = new Array;
                    albums[cnt][0] = sibl.data;
                    albums[cnt][1] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        albumsDataSource = {
    
            _rowData: albums,
    
            // The List calls this method to find out how many rows should be in the list.
            numberOfRows: function() {
                return albums.length;
            },
	
            // The List calls this method once for every row.
            prepareRow: function(rowElement, rowIndex, templateElements) {
                // templateElements contains references to all elements that have an id in the template row.
                // Ex: set the value of an element with id="label".
                if (templateElements.albumName) {
                    templateElements.albumName.innerText = albums[rowIndex][0];
                }

                // Assign a click event handler for the row.
                rowElement.onclick = function(event) {
                    var row = albums[rowIndex];
                    
                    getTracks('album', row[0], true);
                };
            }
        };
        
        document.getElementById('albumsList').object.setDataSource(albumsDataSource);
        document.getElementById('albumsList').object.reloadData;
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
    return true;
}

function tracksXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('tracks').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    tracks[cnt] = new Array;
                    tracks[cnt][0] = sibl.data;
                    tracks[cnt][1] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        tracksDataSource = {
    
            _rowData: tracks,
    
            // The List calls this method to find out how many rows should be in the list.
            numberOfRows: function() {
                return tracks.length;
            },
	
            // The List calls this method once for every row.
            prepareRow: function(rowElement, rowIndex, templateElements) {
                // templateElements contains references to all elements that have an id in the template row.
                // Ex: set the value of an element with id="label".
                if (templateElements.trackName) {
                    templateElements.trackName.innerText = tracks[rowIndex][0];
                }

                // Assign a click event handler for the row.
                rowElement.onclick = function(event) {
                    var row = tracks[rowIndex][0];
                    getTrackInfo(row);
                };
            }
        };
        document.getElementById('tracksList').object.setDataSource(tracksDataSource);
        document.getElementById('tracksList').object.reloadData;
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
}


function trackInfoXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('track').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    track[cnt] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        // Only put a year if we have one
        if (track[3] == '0') {
            track[3] = '';
        } else {
            track[3] = ' [' + track[3] + ']';
        }
        
        var trackTitle = document.getElementById('trackTitle');
        trackTitle.innerHTML = track[0];
        var trackArtist = document.getElementById('trackArtist');
        trackArtist.innerHTML = track[1];
        var trackAlbum = document.getElementById('trackAlbum');
        trackAlbum.innerHTML = track[2] + track[3];
        
        var playButton = document.getElementById('trackPlay');
        playButton.onclick = function(event) {
            playTrack(track[0]);
        }
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
}

function currentTrackXML(xmlRequest) {
    if (xmlRequest.status == 200) {
        var xmldoc = xmlRequest.responseXML
        var root = xmldoc.getElementsByTagName('track').item(0);
        var cnt = 0;
        for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
            var node = root.childNodes.item(iNode);
            for (var i = 0; i < node.childNodes.length; i++) {
                var sibl = node.childNodes.item(i);
                if (sibl.data.length > 0) {
                    current[cnt] = sibl.data;
                    //alert(sibl.data);
                    cnt++;
                }
            }
        }
        
        if (current[0] == "Could not get information from iTunes") {
            alert("Could not retrieve the data from iTunes.");
            var browser = document.getElementById('browser').object;
            browser.goForward('menu', 'iTunes');
        } else {
            
            // Only put a year if we have one
            if (current[3] == '0') {
                current[3] = '';
            } else {
                current[3] = ' [' + current[3] + ']';
            }
        
            var playingTitle = document.getElementById('playingTitle');
            playingTitle.innerHTML = current[0];
            var playingArtist = document.getElementById('playingArtist');
            playingArtist.innerHTML = current[1];
            var playingAlbum = document.getElementById('playingAlbum');
            playingAlbum.innerHTML = current[2] + current[3];
        
            var playButton = document.getElementById('playOrPause');
            playButton.onclick = function(event) {
                playOrPauseTrack();
            }
        }
    } else {
        alert("Error fetching data: HTTP status " + xmlRequest.status);
    }
}