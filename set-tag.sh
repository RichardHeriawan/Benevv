#!/bin/bash

set -euo pipefail

function set_new_version(){
  local version_file=${1}
  local version=$(cat ${version_file} | grep version | tr ":" "\n" | grep -v version)
  local patch_version=$(echo ${version} | tr "." "\n" | tail -1 | tr -d " " | tr -d "," | tr -d "\"")
  local minor_version=$(echo ${version} | tr "." "\n" | tail -2 | head -1 | tr -d " " | tr -d "," | tr -d "\"")
  local major_version=$(echo ${version} | tr "." "\n" | head -1 | tr -d " " | tr -d "," | tr -d "\"")
  local new_patch_version=$((${patch_version} + 1))
  local new_version_line="\"version\": \"${major_version}.${minor_version}.${new_patch_version}\""
  sed -i '/version/c\${new_version_line}' "${version_file}"  > "${version_file}"
  echo "${major_version}.${minor_version}.${new_patch_version}"
}

function main(){
  local version_file=${1:-"app.json"}
  local version=$(set_new_version ${version_file})
  git add .
  git commit -m "Setting new version and tag ${version}"
  git tag -a v${version} -m "Setting tag v${version}"
  git push
}

main "$@"
