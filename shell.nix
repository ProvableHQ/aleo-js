{ pkgs ? import <nixpkgs> {} }:

with pkgs;

let
  inherit (lib) optional optionals;
in

mkShell {
  buildInputs = [
    nodejs-18_x
  ]
  ++ optionals stdenv.isDarwin (with darwin.apple_sdk.frameworks; [
    # For file_system on macOS.
    #Adds some libraries needed to compile the project in mac
    AppKit
  ]);
}
