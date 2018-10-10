中间罗里吧嗦的都是些帮助理解的东西，不想看直接翻转到最后看总结。

在项目开发过程中，经常有做着做着推翻重来的时候。在没有版本管理工具的时候咋办，自己复制个备份，完美解决。但是多人开发协作，你也做了我也做了，如何合并，合并完出问题想找找谁写的bug，合并完又做错了想回退到上个版本，上上个版本，开发版本、上线版本、测试版本都要搞等等问题都需要的时候，版本管理工具方便解决了这些问题。版本管理工具的核心也是不断保存各种版本，保存各种版本的修改，用算法方便查询及调整需要使用的版本和分支。

# 版本管理工具：分布式GIT和集中式SVN
版本管理工具中，流行的工具有主要是Git和svn。

svn属于集中式代表，搭建一个服务器，需要开发的时候拉最新代码开始做，做完传上去。

git属于分布式代表，是所有需要使用的机器上都有完整的版本，需要的合并的时候我们同步下就行。但是 实际项目应用中，应该很少这么干的，反而也会有一个服务器存所有代码，推拉代码都是从服务器上。原因嘛，管理体制，网络状况，在岗状态都有可能影响。

# Git安装

Git安装还是比较简单的，没什么好配置的。直接搜索git，去git官方下载页面。一般会自动识别你当前电脑版本并自动开始下载的。下载完之后运行，下一步下一步就结束了。

安装完之后，使用cmd命令git --version能正常弹出版本信息，说明安装成功。

然后进行自报家名，配置下姓名和邮箱

```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

# 创建版本库

自己用的话，创建文件夹，cmd到对应文件夹下，然后使用git init命令进行创建，根据提示来就行。

公司已经使用线上的gitlab之类的版本建设好之后，直接使用git clone <线上地址>，将线上版本复制到本地，也叫检出、克隆，中间需要输入密码 。复制好之后需要进入对应的目录下。

小技巧：检出远程仓库到本地之后，后续所有推拉代码都需要输入这个密码，如果你对办公室小伙伴放心或者自己有离席锁屏的习惯，克隆的时候线上地址里面直接把密码也填进去，这样推拉代码的时候刷刷的。格式：
```
git clone username:password@path.git
```

# 分支操作
创建完版本库之后，默认是在master分支下。分支的官方解释是：分支是用来将特性开发绝缘开来的。大致的意思是，在分支上开发的时候不影响其他的分支。

实际在开发的时候，最少分为开发分支和生产分支。根据需要可以再进行增加测试分支，处理bug的分支，新功能开发分支等等。分支上面的功能开发完整并测试没什么问题之后，就可以逐步向上合并进一步测试。

场景一：新功能开发开发完之后，合并到开发分支，整合相关模块之后，合并到测试分支，测试分支测试没问题之后，合并到生产分支。生产分支打包发布上线。

场景二：线上发现紧急bug，在线上版本新建bug分支，进行修复测试之后，再进行合并到线上版本进行紧急维护。


按照develop分支举例

- 创建develop分支并切过去 git checkout -b develop
- 切换回主分支 git checkout master
- 删除develop分支  git checkout -d develop
- 查看所有分支 git branch -a
- 创建与远程同名的develop分支，并进行绑定 git checkout -t origin/develop

# 工作流分支
本地版本库当前分支维护的其实是三个区域，当前开发目录，缓存区Index，分支树head。

本地开发的过程中，先要拉取远程的最新代码，开发完后修改内容先提交到缓存区，再提交到版本库，然后将本地版本提交到远程库。

相关命令：

- git pull  先拉取远程库里面最新代码
- git add . 将本地所有改动提交到缓存区
- git commit -m "版本说明" 将本地缓存区内容提交到版本库
- git push 将本地版本库提交到远程

这样一个工作流程结束。当然 git add 加具体的文件名可以提交某一个文件到缓存区，但是我是用的不多。

实际工作中，常用的差不多就这么多。


# 总结
个人平时用到的工作流程

1. 安装：官网下载，然后下一步
2. 检出：git clone https://username:password@path.git
3. 切换并绑定远程分支:git checkout -t origin/develop
4. 拉去最新代码：git pull
5. 添加更新：git add .
6. 添加版本: git commit -m "版本说明"
7. 推送远程：git push

工作中平时就是4567来回走。

# 更多
更多其他用法多了去了。下面贴上比较完整命令供参考

```
# 在当前目录新建一个Git代码库
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]

# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"

# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]

# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...

# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]

# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]

# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的代码差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog

# 从本地master拉取代码更新当前分支：branch 一般为master
$ git rebase [branch]

# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all

# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop

# 生成一个可供发布的压缩包
$ git archive

```

# 文末
说到底，这就是个工具，半天看看就行了。录入命令熟了就行了。遇到问题，具体再翻翻问题再具体翻翻文档。
几乎所有IDE工具都搭载git环境，直接配置好就行，用的也挺好。不过个人感觉没有命令行看着清晰，而且电脑配置一般的话，也会卡。看官您根据自己想法来就行！


