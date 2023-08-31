import { log } from "console";
import { Platform, PluginSettingTab, Setting } from "obsidian";

export class MySettingsTab extends PluginSettingTab {
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "设置插件" });

    this.folder();
    this.notebookBlacklist();
    this.dailyNotes();
    this.template();
    this.showDebugHelp();
  }

  private folder(): void {
    new Setting(this.containerEl)
      .setName("文件夹")
      .setDesc("请选择Obsidian Vault中存放的位置")
      .addDropdown((dropdown) => {
        const files = (this.app.vault.adapter as any).files;

        Object.keys(files).forEach((val) => {
          dropdown.addOption(val, val);
        });
        return dropdown.setValue("").onChange(async (value) => {
          log(value);
        });
      });
  }

  private notebookBlacklist(): void {
    new Setting(this.containerEl)
      .setName("书籍黑名单111")
      .setDesc(
        "请填写不同步的bookId，bookId可在meta信息中找到，多本书使用逗号「，」隔开"
      )
      .addText((input) => {
        input.setValue("").onChange((value: string) => {
          log(value);
        });
      });
  }

  private dailyNotes(): void {
    new Setting(this.containerEl)
      .setName("是否保存笔记到 DailyNotes？")
      .setHeading()
      .addToggle((toggle) => {
        return toggle.setValue(false).onChange((value) => {
          log(value);
          this.display();
        });
      });
  }

  private template(): void {
    const descFragment = document.createRange()
      .createContextualFragment(`<a href="https://github.com/zhaohongxuan/obsidian-weread-plugin/wiki/Weread-obsidian-plugin-markdown-template-usage">模板使用说明</a>
			<p>
			  <h2>可用变量</h2>
			</p>
			元数据变量(metaData)
			<ul>
			  <li><span class="u-pop">{{title}}</span> - 书名</li>
			  <li><span class="u-pop">{{author}}</span> - 作者</li>
			  <li><span class="u-pop">{{cover}}</span> - 封面</li>
			  <li><span class="u-pop">{{intro}}</span> - 书籍简介</li>
			  <li><span class="u-pop">{{bookId}}</span> - 微信图书ID </li>
			  <li><span class="u-pop">{{publishTime}}</span> - 出版时间</li>
			  <li><span class="u-pop">{{noteCount}}</span> - 划线数量</li>
			  <li><span class="u-pop">{{reviewCount}}</span> - 笔记数量</li>
			  <li><span class="u-pop">{{isbn}}</span> - ISBN</li>
			  <li><span class="u-pop">{{category}}</span> - 分类</li>
			  <li><span class="u-pop">{{publisher}}</span> - 出版社</li>
			  <li><span class="u-pop">{{finish}}</span> - 是否读完（还未支持）</li>
			</ul>
			划线变量(chapterHighlights)
			<ul>
			  <li><span class="u-pop">{{chapterUid}}</span> - 章节ID</li>
			  <li><span class="u-pop">{{chapterTitle}}</span> - 章节标题</li>
			  <li><span class="u-pop">{{createTime}}</span> - 创建时间</li>
			  <li><span class="u-pop">{{range}}</span> - 划线范围</li>
			  <li><span class="u-pop">{{markText}}</span> - 划线文本</li>
			</ul>
			笔记笔记(bookReview)
			<ul>
			  <li><span class="u-pop">{{reviewId}}</span> - reviewId</li>
			  <li><span class="u-pop">{{chapterUid}}</span> - 章节ID</li>
			  <li><span class="u-pop">{{chapterTitle}}</span> - 章节标题</li>
			  <li><span class="u-pop">{{createTime}}</span> - 创建时间</li>
			  <li><span class="u-pop">{{abstract}}</span> - 摘录内容</li>
			  <li><span class="u-pop">{{content}}</span> - 笔记内容</li>
			  <li><span class="u-pop">{{mdContent}}</span> - markdown笔记格式</li>
			  <li><span class="u-pop">{{type}}</span> - 类型</li>
			  <li><span class="u-pop">{{range}}</span> - 范围</li>
			</ul>
			`);

    new Setting(this.containerEl)
      .setName("笔记模板")
      .setDesc(descFragment)
      .addTextArea((text) => {
        text.inputEl.style.width = "100%";
        text.inputEl.style.height = "540px";
        text.inputEl.style.fontSize = "0.8em";
        text.setValue("").onChange(async (value) => {});
        return text;
      });
  }

  private showDebugHelp() {
    const info = this.containerEl.createDiv();
    info.setAttr("align", "center");
    info.setText(
      "查看控制台日志: 使用以下快捷键快速打开控制台，查看本插件以及其他插件的运行日志"
    );

    const keys = this.containerEl.createDiv();
    keys.setAttr("align", "center");
    keys.style.margin = "10px";
    if (Platform.isMacOS === true) {
      keys.createEl("kbd", { text: "CMD (⌘) + OPTION (⌥) + I" });
    } else {
      keys.createEl("kbd", { text: "CTRL + SHIFT + I" });
    }
  }
}
