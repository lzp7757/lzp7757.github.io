```
# 软件相关
calc notepad
atom sublime code


# 目录相关
pwd
dir
ls
ls -a
mkdir
rm -rf

# 文件相关
touch test.js
stat test.js

git init git config --system global local --list user.name user.email


安装完成之后
git config --global user.name "Nicholas"
git config --global user.email "Nicholas@example.com"

git init


# 基本操作

# 添加到暂存区（叉车）
git add index.html

# 提交到版本库
git commit -m '提交说明'

# 查看当前状态
git status

# 查看版本库版本记录
git log

# 回退到某个版本
git reset --hard xxxx

# 查看版本库所有历史操作
git reflog



https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013743256916071d599b3aed534aaab22a0db6c4e07fd0000
```

```
# 查看配置文件
git config --system --list
git config --global --list
git config --local --list

# 配置环境
git config --global user.name "Nicholas"
git config --global user.email "Nicholas@example.com"

git config color.ui true
git config alias.co checkout
git config alias.ci commit -m
git config alias.st status
git config alias.bc branch

# 新建克隆版本库
git init
git clone

# 添加到暂存区
git add file
git add .

.gitignore
*.txt
a.txt
!b.txt
/vendor
/vendor/**/*.txt

# 提交到版本库
git commit

# 查看版本库状态
git status
--------------------
git diff 
工作区和暂存区对比

git diff HEAD
工作区和版本库对比

git diff --cached
暂存区和版本库对比
--------------------------
git log
git log --pretty=oneline
git reflog

# 删除文件
git rm test.txt
# 暂存区和工作区都删除
git rm --cached readme.txt 
# 只删除版本库

# 文件重命名
git mv a.js indexController,js



# 回退版本
git reset HEAD^
git reset --hard HEAD^


# 撤销工作区更改

git reset HEAD file
# 使用版本库替换暂存区

git checkout -- file
# 使用暂存区替换工作区


```

