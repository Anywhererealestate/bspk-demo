import { SvgAccountCircle } from '@bspk/icons/AccountCircle';
import { SvgDarkMode } from '@bspk/icons/DarkMode';
import { SvgDarkModeFill } from '@bspk/icons/DarkModeFill';
import { SvgHelp } from '@bspk/icons/Help';
import { SvgInfo } from '@bspk/icons/Info';
import { SvgLicense } from '@bspk/icons/License';
import { SvgLogout } from '@bspk/icons/Logout';
import { SvgMenuBook } from '@bspk/icons/MenuBook';
import { SvgSettings } from '@bspk/icons/Settings';
import { Avatar } from '@bspk/ui/Avatar/Avatar';
import { AvatarGroup } from '@bspk/ui/AvatarGroup/AvatarGroup';
import { Button } from '@bspk/ui/Button/Button';
import { Card } from '@bspk/ui/Card/Card';
import { CheckboxOption } from '@bspk/ui/CheckboxOption/CheckboxOption';
import { DatePickerField } from '@bspk/ui/DatePickerField/DatePickerField';
import { Divider } from '@bspk/ui/Divider/Divider';
import { Input } from '@bspk/ui/Input/Input';
import { InputField } from '@bspk/ui/InputField/InputField';
import { ListItem } from '@bspk/ui/ListItem/ListItem';
import { Menu } from '@bspk/ui/Menu/Menu';
import { ProgressBar } from '@bspk/ui/ProgressBar/ProgressBar';
import { ProgressCircle } from '@bspk/ui/ProgressCircle/ProgressCircle';
import { RadioGroupField } from '@bspk/ui/RadioGroupField/RadioGroupField';
import { SearchBar } from '@bspk/ui/SearchBar/SearchBar';
import { SegmentedControl } from '@bspk/ui/SegmentedControl/SegmentedControl';
import { SelectField } from '@bspk/ui/SelectField/index';
import { Slider } from '@bspk/ui/Slider/Slider';
import { Switch } from '@bspk/ui/Switch/Switch';
import { TextareaField } from '@bspk/ui/TextareaField/TextareaField';
import { TimePickerField } from '@bspk/ui/TimePickerField/TimePickerField';
import { Tooltip } from '@bspk/ui/Tooltip/Tooltip';
import { Txt } from '@bspk/ui/Txt/Txt';
import { useEffect, useRef, useState } from 'react';
import { Flex } from 'src/components/Flex';
import { Grid } from 'src/components/Grid';
import { Layout } from 'src/components/Layout';
import { Page } from 'src/components/Page';
import { action } from 'src/utils/actions';
import { useGlobalState } from 'src/utils/globalState';

type StateType = Date | string[] | boolean | number | string;

export function Welcome() {
    const [state, setState] = useState<{ [key: string]: unknown }>({});

    const stateProps = <T extends StateType>(name: string, defaultValue?: T) => {
        return {
            value: (state[name] as T) || defaultValue,
            onChange: (value: T | undefined) => {
                setState((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            },
            name,
        };
    };

    const { theme, setTheme } = useGlobalState();

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current && state.volume) {
            const volume = Number(state.volume) / 11;
            audioRef.current.volume = volume;
            if (volume > 0.1) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [state.volume]);

    return (
        <Page style={{ padding: '0' }}>
            <audio autoPlay={!!state.volume} controls loop={!!state.volume} ref={audioRef} style={{ display: 'none' }}>
                <track kind="captions" />
                <source src="/audio-test.mp3" type="audio/ogg" />
            </audio>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 'var(--spacing-sizing-10)',
                    textAlign: 'center',
                }}
            >
                <h1>BSPK: The Foundation for Your Next Project</h1>
                <p>
                    A set of custom designed components that you can extend and build on. BSPK makes following the
                    Bespoke Design System easier than ever. Open Source. Open Code.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-sizing-06)',
                        marginTop: 'var(--spacing-sizing-02)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Button as="a" href="/get-started" label="Get Started" size="small" variant="secondary" />
                    <Button as="a" href="/components" label="View Components" size="small" variant="secondary" />
                </div>
            </section>
            <section style={{ width: '100%', maxWidth: '1280px', padding: 'var(--spacing-sizing-10)' }}>
                <Layout
                    gap="24px"
                    minColumnWidth="300px"
                    //style={{ marginTop: 'var(--spacing-sizing-10)', width: '100%', maxWidth: '800px' }}
                >
                    <Card
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-sizing-04)',
                            padding: 'var(--spacing-sizing-06)',
                            alignItems: 'flex-start',
                        }}
                        variant="outlined"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(
                                    'Form submitted with state:',
                                    JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
                                );
                            }}
                            style={{ display: 'contents' }}
                        >
                            <Txt variant="labels-base">Payment Method</Txt>
                            <Txt variant="body-small">All transactions are secure and encrypted</Txt>
                            <InputField
                                label="Name on Card"
                                size="small"
                                {...stateProps<string>('payment-name')}
                                placeholder="John Doe"
                            />
                            <Grid columnWidths={[3, 1]} gap="16px">
                                <InputField
                                    label="Card Number"
                                    size="small"
                                    {...stateProps<string>('payment-card-number')}
                                    placeholder="1234 5678 9012 3456"
                                    type="number"
                                />
                                <InputField
                                    label="CVV"
                                    size="small"
                                    {...stateProps<string>('payment-cvv')}
                                    placeholder="123"
                                    style={{ maxWidth: '90px' }}
                                />
                            </Grid>
                            <Grid columnWidths={[4, 6]} gap="16px">
                                <SelectField
                                    label="Expiration Month"
                                    size="small"
                                    {...stateProps<string>('payment-expiration')}
                                    options={Array.from({ length: 12 }, (_, i) => ({
                                        label: (i + 1).toString().padStart(2, '0'),
                                        value: (i + 1).toString().padStart(2, '0'),
                                    }))}
                                    placeholder="MM"
                                    scrollLimit={5}
                                />
                                <SelectField
                                    label="Expiration Year"
                                    size="small"
                                    {...stateProps<string>('payment-expiration-year')}
                                    options={Array.from({ length: 10 }, (_, i) => {
                                        const year = new Date().getFullYear() + i;
                                        return { label: year.toString(), value: year.toString() };
                                    })}
                                    placeholder="YYYY"
                                    scrollLimit={5}
                                />
                            </Grid>
                            <Divider />
                            <Txt variant="labels-base">Billing Address</Txt>
                            <Txt variant="body-small">The billing address associated with your payment method</Txt>
                            <CheckboxOption
                                label="Same as Shipping Address"
                                {...stateProps<boolean>('same-as-shipping')}
                                checked={state['same-as-shipping'] as boolean}
                                style={{ '--list-item-height': 'auto' }}
                                value="true"
                            />
                            <Divider />
                            <TextareaField
                                label="Comments"
                                maxRows={2}
                                minRows={2}
                                size="small"
                                {...stateProps<string>('comments')}
                                placeholder="Add any additional comments here..."
                            />
                            <Flex>
                                <Button label="Submit" type="submit" variant="primary" />
                                <Button label="Cancel" onClick={() => {}} type="button" variant="secondary" />
                            </Flex>
                        </form>
                    </Card>
                    <Flex direction="column">
                        <Card
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sizing-04)',
                                padding: 'var(--spacing-sizing-06)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                            variant="outlined"
                        >
                            <AvatarGroup
                                items={[
                                    { name: 'George Costanza', initials: 'GC', color: 'yellow' },
                                    { name: 'Alice Johnson', image: '/avatar-01.png' },
                                    { name: 'Bob Smith', image: '/avatar-02.png' },
                                    { name: 'Diana Prince', image: '/avatar-05.png' },
                                    { name: 'Ethan Hunt', initials: 'EH', color: 'blue' },
                                    { name: 'Charlie Brown', image: '/avatar-03.png' },
                                    { name: 'Frank Underwood', image: '/avatar-04.png' },
                                    { name: 'Fiona Glenanne', initials: 'FG', color: 'red' },
                                    { name: 'Hannah Baker', initials: 'HB', color: 'purple' },
                                    { name: 'Irene Adler', initials: 'IA', color: 'pink' },
                                ]}
                                max={5}
                                size="medium"
                                variant="stacked"
                            />
                            <Txt variant="subheader-medium">Team Members</Txt>
                            <Txt variant="body-small">Manage your team and permissions here. Lorem ipsum dolor.</Txt>
                            <Button label="Manage Team" variant="secondary" />
                        </Card>
                        <Flex
                            gap="var(--spacing-sizing-04)"
                            style={{ padding: 'var(--spacing-sizing-04)', alignContent: 'start' }}
                        >
                            <ProgressBar completion={75} label="Uploading Files..." size="large" />
                            <Slider
                                {...stateProps<number>('volume')}
                                label="Volume"
                                max={11}
                                min={0}
                                step={0.1}
                                value={state.volume as number | undefined}
                            />
                            <SearchBar
                                size="small"
                                {...stateProps<string>('search')}
                                placeholder="Search..."
                                trailing={
                                    <Txt style={{ color: 'var(--foreground-neutral-on-surface-variant-03)' }}>
                                        12 Results
                                    </Txt>
                                }
                            />
                            <Input
                                showClearButton={false}
                                size="small"
                                {...stateProps<string>('http')}
                                leading="https://"
                                trailing={
                                    <Tooltip label="This is content in a tooltip.">
                                        {(triggerProps) => <SvgInfo {...triggerProps} />}
                                    </Tooltip>
                                }
                            />
                        </Flex>
                        <Flex justify="center">
                            <ProgressCircle label="Loading..." labelPosition="right" size="small" />
                        </Flex>
                        <Divider />
                        <RadioGroupField
                            label="Select your preferred contact method"
                            {...stateProps<string>('contact-method')}
                            aria-label="Choose a contact method"
                            helperText="How should we reach you for important updates?"
                            options={[
                                {
                                    label: 'Email',
                                    value: 'email',
                                    description: 'We will send notifications to your email.',
                                },
                                {
                                    label: 'Phone',
                                    value: 'phone',
                                    description: 'We will call or text your phone number.',
                                },
                                { label: 'None', value: 'none', description: 'You will not receive notifications.' },
                            ]}
                            {...stateProps<string>('radio-example', 'phone')}
                        />
                    </Flex>
                    <Flex>
                        <Grid columnWidths={[1, 1]} gap="16px">
                            <DatePickerField
                                label="Destination Date"
                                {...stateProps<Date>('destination-date', new Date('1985-10-26'))}
                            />
                            <TimePickerField label="Time" {...stateProps<string>('destination-time', '01:21')} />
                        </Grid>
                        <Grid columnWidths={[1, 1]} gap="16px">
                            <DatePickerField label="Present Date" {...stateProps<Date>('present-time', new Date())} />
                            <TimePickerField
                                label="Time"
                                {...stateProps<string>(
                                    'present-time-2',
                                    new Date().toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }),
                                )}
                            />
                        </Grid>
                        <Grid columnWidths={[1, 1]} gap="16px">
                            <DatePickerField
                                label="Last Date Departed"
                                {...stateProps<Date>('last-time-departed', new Date('1985-10-26T12:00:00'))}
                            />
                            <TimePickerField label="Time" {...stateProps<string>('last-time-departed-2', '01:20')} />
                        </Grid>

                        <SegmentedControl
                            {...stateProps<string>('time-period', 'present')}
                            label="Menu"
                            options={[
                                { label: 'Posts', value: 'posts' },
                                { label: 'Media', value: 'media' },
                                { label: 'Pages', value: 'pages' },
                                { label: 'Comments', value: 'comments' },
                            ]}
                            value={(state['time-period'] as string) || 'present'}
                        />
                        <Menu
                            style={{ zIndex: 'unset', padding: 'var(--spacing-sizing-02) var(--spacing-sizing-02)' }}
                            width="100%"
                        >
                            <ListItem
                                label="Michael Scott"
                                leading={<Avatar image="/avatar-01.png" name="Michael Scott" />}
                                subText="michael.scott@email.com"
                            />
                            <Divider inset={2} padding />
                            <ListItem href="#/my-profile" label="My profile" leading={<SvgAccountCircle />} />
                            <ListItem href="#/settings" label="Settings" leading={<SvgSettings />} />
                            <ListItem
                                as="label"
                                label="Dark mode"
                                leading={theme === 'dark' ? <SvgDarkModeFill /> : <SvgDarkMode />}
                                trailing={
                                    <Switch
                                        aria-label="Toggle dark mode"
                                        checked={theme === 'dark'}
                                        name="dark-mode"
                                        onChange={() => {
                                            setTheme(theme === 'dark' ? 'light' : 'dark');
                                        }}
                                        value="dark-mode"
                                    />
                                }
                            />
                            <Divider inset={2} padding={false} thickness="light" />
                            <ListItem href="#/guide-tutorial" label="Guide and tutorial" leading={<SvgMenuBook />} />
                            <ListItem href="#/help-center" label="Help center" leading={<SvgHelp />} />
                            <Divider inset={2} padding />
                            <ListItem href="#/go-premium" label="Go premium" leading={<SvgLicense />} />
                            <ListItem
                                label="Log out"
                                leading={<SvgLogout />}
                                onClick={() => {
                                    action('Log out clicked');
                                }}
                                role="button"
                            />
                        </Menu>
                    </Flex>
                </Layout>
            </section>
        </Page>
    );
}
