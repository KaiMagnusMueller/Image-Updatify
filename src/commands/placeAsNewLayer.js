import Context from '../context'
import * as Data from '../library/data'
import * as Gui from '../library/gui'
import * as Layers from '../library/layers'
import * as Populator from '../library/populator'
import Options, * as OPTIONS from '../library/options'


export default (context) => {
  var doc = context.document;
  var plugin = context.plugin;
  var command = context.command;

  var page = [doc currentPage];
  var layers = [page children];
  var selection = context.selection;

  if ([doc fileURL]) {
    var docDir = PlaceLinkedBitmap.getDirFromLocalURL([doc fileURL],true);
    var group;

    if(selectedFolderURL == ""){
      log("No common folder set. Searching...")
      selectedFolderURL = PlaceLinkedBitmap.findSelectedFolder(context, layers, docDir)
      //If No folder is currently selected and no previously placed image was found
      //the plugin asks to set a new folder for the first image
    }

    if ([selection count] > 0) {
      var sel = [selection objectAtIndex:0];
      if ([sel className] == "MSArtboardGroup") {
        group = sel;
      } else {
        group = [sel parentGroup];
      }
    } else {
      group = page;
    }

    var selectedBitmapURL = PlaceLinkedBitmap.openPanelMultiple(docDir,"Select a bitmap file to place…","Select","Place Bitmap");
    if ([selectedBitmapURL count] > 0) {
      for (x = 0; x < [selectedBitmapURL count]; x++) {
        var thisBitmap = [selectedBitmapURL objectAtIndex:x];
        var relativeURL = PlaceLinkedBitmap.getCommonDir([thisBitmap absoluteString],docDir);
        var layerName = PlaceLinkedBitmap.makeLayerName(relativeURL,[[doc fileURL] absoluteString]);
        var imageLayer = PlaceLinkedBitmap.makeBitmapLayer(group,layerName,thisBitmap);

        log("        relativeURL → " + relativeURL);
        log("        layerName → " + layerName);

        var selectedURL = PlaceLinkedBitmap.getOnlySelectedFolder(selectedFolderURL)
        log("        selectedURL → " + selectedURL);

        // log("imageLayer:");
        // log(imageLayer);
        [command setValue:relativeURL forKey:"originalURL" onLayer:imageLayer];
        [command setValue:selectedURL forKey:"selectedURL" onLayer:imageLayer];
        // log("originalURL → " + [command valueForKey:"originalURL" onLayer:imageLayer]);
        [imageLayer select:true byExpandingSelection:false];
      }
    }
  } else {
    PlaceLinkedBitmap.util.displayAlert("Place Linked Bitmap…","Please save your Sketch document before placing a bitmap or set a project folder.");
  }
};
