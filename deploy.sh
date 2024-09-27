#!/usr/bin/env bash
set -euo pipefail

# Prints a timestamp and a message
function log() {
    echo -e " $(date +%Y/%m/%dT%H:%M:%S)\t${1}"
}

# prints a timestamp and a message before running a command
function log_and_run() {
    log "INFO: $*"
    "$@"
}

# corresponds to -h
function display-help() {
    echo "This script should be used from CircleCI, through the makefile in this repository."
    echo
    echo "options:"
    echo "-b [ios]    Build the repository through EAS for the specified platform (currently only iOS)"
    echo "-s [ios]    Submit the latest build available on EAS to the specified platform's app store (currently only iOS)"
}

# installs necessary expo tools, then installs dependencies for project
function install-npm() {
    log_and_run sudo npm install -g expo-cli
    log_and_run sudo npm install -g eas-cli
    log_and_run npm install --force
}

function log-in-to-expo() {
    log_and_run expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
}

# increments build number using increment.build
function increment-build-num-ios() {
    local VERSION=$(jq -r '.expo.version' app.json)
    local BUILDNUMBER=$(curl https://increment.build/benevv-ios-${VERSION})
    local TMPFILE=$(mktemp)

    jq --arg b "${BUILDNUMBER}" '.expo.ios.buildNumber = $b' app.json > "${TMPFILE}"
    mv "${TMPFILE}" app.json
}

function set-development-eas() {
    local TMPFILE=$(mktemp)

    jq '.build.development.developmentClient = false' eas.json > "${TMPFILE}"
    mv "${TMPFILE}" eas.json
}

function set-development-env() {
    local TMPFILE=$(mktemp)

    jq '.isDevelopment = false' env.json > "${TMPFILE}"
    mv "${TMPFILE}" env.json
}

# builds the app through EAS; corresponds to -b ios
function build-ios() {
    install-npm
    increment-build-num-ios
    set-development-eas
    set-development-env
    log-in-to-expo

    log_and_run eas build --non-interactive --platform ios --clear-cache
}

# submits the latest build from EAS; corresponds to -s ios
function submit-ios() {
    install-npm
    log-in-to-expo

    log_and_run eas submit --non-interactive --platform ios --latest
}

# main program functionality
# reads the command-line arguments and executes the appropriate steps
function main() {
    while getopts ":hb:s:" option; do
        case $option in
            h)
                display-help
                exit;;
            b) # enter platform to build for
                if [[ "$OPTARG" == "ios" ]]
                then
                    build-ios
                else
                    echo "Platforms other than iOS are not supported yet"
                fi
                exit;;
            s)
                if [[ "$OPTARG" == "ios" ]]
                then
                    submit-ios
                else
                    echo "Platforms other than iOS are not supported yet"
                fi
                exit;;
            \?)
                echo "Invalid option. Run '$0 h' to see available options."
                exit;;
        esac
    done
}

main "$@"
