# Utility functions
# Mostly from https://raw.githubusercontent.com/fastlane/examples/master/Wikipedia/lib/utils.rb
require 'git'
require 'erb'

def template(file)
  contents = open(File.join(File.dirname(__FILE__), file)).read
  ERB.new(contents)
end
# Generate a list of commit subjects from `rev` to `HEAD`
# :rev: The git SHA to start the log from, defaults to `ENV[LAST_SUCCESS_REV']`
def generate_git_commit_log(version, rev=ENV['GIT_PREVIOUS_SUCCESSFUL_COMMIT'] || 'HEAD^^^^^')
  g = Git.open(ENV['PWD'], :log => Logger.new(STDOUT))
  begin
    version_number = version
    changelog = g.log.between(rev)
    template('./README.erb').result(binding)
  rescue Exception => e
    p [:e, e]
    "Unable to parse commit logs"
  end
end

# Memoized version of `generate_git_commit_log` which stores the result in `ENV['GIT_COMMIT_LOG']`.
def git_commit_log
  ENV['GIT_COMMIT_LOG'] || ENV['GIT_COMMIT_LOG'] = generate_git_commit_log
end

# Parses JSON output of `plutil`
def info_plist_to_hash(path)
  require 'json'
  JSON.parse! %x[plutil -convert json -o - #{path}]
end

def get_key(path, key)
  plist_hash = info_plist_to_hash path
  plist_hash[key]
end

def get_app_name(path)
  plist_hash = info_plist_to_hash path
  plist_hash['CFBundleDisplayName']
end

# Hack to read app version from Info.plist
def get_version_short_string(path)
  plist_hash = info_plist_to_hash path
  plist_hash['CFBundleShortVersionString']
end
