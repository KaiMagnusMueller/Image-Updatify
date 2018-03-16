/**
 * Plugin
 *
 * Defines the plugin structure and metadata.
 */


import * as commands from './commands'

export const HKSketchFusionExtension = {
  name: 'Image Updatify',
  bundleName: 'Image Updatify',
  description: 'Link and update images. Set a project folder and share Sketch files with your team',
  author: 'precious design studio',
  authorEmail: 'info@precious-forever.com',
  version: '0.0.1',
  identifier: '',
  compatibleVersion: '48',
  appcast: '',
  menu: {
    'isRoot': false,
    'items': [
      'placeAsNewLayer',
      'placeAsFillStyle',
      'updateBitmaps',
      'settings'
    ]
  },
  commands: {
    placeAsNewLayer: {
      name: 'Place image as new Layer…',
      shortcut: 'control command i',
      description: '',
      icon: '',
      run: commands.placeAsNewLayer
    },
    placeAsFillStyle: {
      name: 'Place image as fill style…',
      shortcut: '',
      description: '',
      icon: '',
      run: commands.placeAsFillStyle
    },
    updateBitmaps: {
      name: 'Update Bitmaps',
      shortcut: 'control command u',
      description: '',
      icon: '',
      run: commands.updateBitmaps
    },
    settings: {
      name: 'Settings…',
      shortcut: '',
      description: 'Populate again with last used setup',
      icon: '',
      run: commands.settings
    }
  }
}
