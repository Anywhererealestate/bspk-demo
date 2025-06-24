import { AvatarExample as Avatar } from '@bspk/ui/demo/examples/Avatar';
import { BadgeExample as Badge } from '@bspk/ui/demo/examples/Badge';
import { BannerAlertExample as BannerAlert } from '@bspk/ui/demo/examples/BannerAlert';
import { BreadcrumbExample as Breadcrumb } from '@bspk/ui/demo/examples/Breadcrumb';
import { ButtonExample as Button } from '@bspk/ui/demo/examples/Button';
import { CardExample as Card } from '@bspk/ui/demo/examples/Card';
import { DividerExample as Divider } from '@bspk/ui/demo/examples/Divider';
import { EmptyStateExample as EmptyState } from '@bspk/ui/demo/examples/EmptyState';
import { FabExample as Fab } from '@bspk/ui/demo/examples/Fab';
import { LinkExample as Link } from '@bspk/ui/demo/examples/Link';
import { ListItemExample as ListItem } from '@bspk/ui/demo/examples/ListItem';
import { MenuExample as Menu } from '@bspk/ui/demo/examples/Menu';
import { ModalExample as Modal } from '@bspk/ui/demo/examples/Modal';
import { PopoverExample as Popover } from '@bspk/ui/demo/examples/Popover';
import { ProgressionStepperExample as ProgressionStepper } from '@bspk/ui/demo/examples/ProgressionStepper';
import { RadioExample as Radio } from '@bspk/ui/demo/examples/Radio';
import { RadioGroupExample as RadioGroup } from '@bspk/ui/demo/examples/RadioGroup';
import { RadioOptionExample as RadioOption } from '@bspk/ui/demo/examples/RadioOption';
import { SearchBarExample as SearchBar } from '@bspk/ui/demo/examples/SearchBar';
import { SegmentedControlExample as SegmentedControl } from '@bspk/ui/demo/examples/SegmentedControl';
import { SelectExample as Select } from '@bspk/ui/demo/examples/Select';
import { TabGroupExample as TabGroup } from '@bspk/ui/demo/examples/TabGroup';
import { TextInputExample as TextInput } from '@bspk/ui/demo/examples/TextInput';
import { TextareaExample as Textarea } from '@bspk/ui/demo/examples/Textarea';
import { TextareaFieldExample as TextareaField } from '@bspk/ui/demo/examples/TextareaField';
import { ComponentExample, ComponentExampleFn } from '@bspk/ui/demo/utils';
import { MetaComponentName } from 'src/meta';

export const examples: Partial<Record<MetaComponentName, ComponentExample<any> | ComponentExampleFn<any>>> = {
    Avatar,
    Badge,
    BannerAlert,
    Breadcrumb,
    Button,
    Card,
    Divider,
    EmptyState,
    Fab,
    Link,
    ListItem,
    Menu,
    Modal,
    Popover,
    ProgressionStepper,
    Radio,
    RadioGroup,
    RadioOption,
    SearchBar,
    SegmentedControl,
    Select,
    TabGroup,
    TextInput,
    Textarea,
    TextareaField,
};
