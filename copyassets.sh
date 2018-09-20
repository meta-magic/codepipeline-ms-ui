#!/usr/bin/env bash
cp -a src/assets/ dist/
echo "Copied assets folder to dist"
echo "Copy dist/ to Apache Server"
cd dist && npm pack &&  mv codepipeline-ms-ui-0.0.0.tgz codepipelinemsui.tgz && cp -a codepipelinemsui.tgz /var/www/html/desireplatform/micro-ui-libs/

