# name: FalconAidPlugin
# about:
# version: 0.1
# authors: 172226325
# url: https://github.com/172226325


register_asset "stylesheets/common/falcon-aid-plugin.scss"


enabled_site_setting :falcon_aid_plugin_enabled

PLUGIN_NAME ||= "FalconAidPlugin".freeze

after_initialize do
  
  # see lib/plugin/instance.rb for the methods available in this context
  

  module ::FalconAidPlugin
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace FalconAidPlugin
    end
  end

  

  
  require_dependency "application_controller"
  class FalconAidPlugin::ActionsController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    before_action :ensure_logged_in

    def list
      render json: success_json
    end
  end

  FalconAidPlugin::Engine.routes.draw do
    get "/list" => "actions#list"
  end

  Discourse::Application.routes.append do
    mount ::FalconAidPlugin::Engine, at: "/falcon-aid-plugin"
  end
  
end
