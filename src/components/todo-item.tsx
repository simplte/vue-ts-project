import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import './index.less'
interface Item {
    text: string;
    complete: boolean
}
@Component({
    name: 'todoItem',
})

export default class TodoItem extends Vue {
    @Prop(Object) public item!: Item;
    @Prop(Number) public index!: number;
    @Prop(Number) public edittingId !: number;
    public edittingContent = "";
    @Watch('edittingId')
    public edittingChange(index) {
        if (index == this.index) {
            this.edittingContent = this.item.text;
        } else {
            this.edittingContent = "";
        }
    }

    // 第一种向父元素传递参数的写法
    // public save() {
    //     this.$emit("on-save",{
    //         index:this.index,
    //         content:this.edittingContent
    //     })
    // }

    // 第二种使用装饰器的写法
    @Emit('on-save')
    public save() {
        return {
            index: this.index,
            content: this.edittingContent
        }
    }
    // 传参的第二种写法
    @Emit('on-saveType2')
    public saveType2(index, content, event) {
        event.stopPropagation()
        return {
            index, content
        }
    }
    // 第一种emit写法
    // public edit() {
    //     this.$emit("on-edit", this.index);
    // }
    // 第二种emit的写法
    @Emit()
    public onEdit(event) {
        // 组织事件冒泡
        event.stopPropagation()
        return this.index;
    }
    public cancel(event) {
        event.stopPropagation()
        this.$emit("on-cancel");
    }

    public complete(event) {
        event.stopPropagation()
        this.$emit("on-complete", this.index);
    }
    protected render() {
        return <li class="item-wrap" >{
            this.edittingId == this.index
                ? (<div>
                    <a-input v-model={this.edittingContent}></a-input>
                    <a-icon type='check' nativeOn-click={this.save}></a-icon>
                    <a-icon type='check' nativeOn-click={this.saveType2.bind(this, this.index, this.edittingContent)}></a-icon>
                    <a-icon type="close" nativeOn-click={this.cancel}></a-icon>
                </div>)
                : (<div>
                    <span on-click={this.complete} style={this.item.complete ? { textDecoration: 'line-through' } : {}}>{this.item.text}</span>
                    {/* 第一种emit的写法 */}
                    {/* <a-icon type="edit" nativeOn-click={this.edit}></a-icon> */}
                    {/* 第二种emit的写法 */}
                    <a-icon type="edit" nativeOn-click={this.onEdit}></a-icon>
                </div>)
        }</li>
    }
}