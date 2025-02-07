import React from 'react';
import i18next from 'i18next';
import { SettingsModal } from './components/settings-modal.component.js';
import { ServicesContainer } from './services/services-container.js';
import { Locale } from '@shared';

async function main(): Promise<void> {
    while (!Spicetify?.Platform) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const react = Spicetify.React as typeof React;

    // Init services
    ServicesContainer.kuroshiro.init();

    // Init translations
    const locale: Locale = (Spicetify as any).Locale;

    await i18next.init({
        lng: locale.getLocale(),
        fallbackLng: 'en',
        debug: false,
        resources: {
            en: {
                translation: {
                    settings: {
                        title: 'Japanese conversion settings',
                        targetSyllabary: {
                            label: 'Target syllabary',
                            values: {
                                hiragana: 'Hiragana',
                                katakana: 'Katakana',
                                romaji: 'Romaji',
                            },
                        },
                        conversionMode: {
                            label: 'Conversion mode',
                            values: {
                                normal: 'Normal',
                                spaced: 'Spaced',
                                okurigana: 'Okurigana',
                                furigana: 'Furigana',
                            },
                        },
                        romajiSystem: {
                            label: 'Romaji system',
                            values: {
                                nippon: 'Nippon',
                                passport: 'Passport',
                                hepburn: 'Hepburn',
                            },
                        },
                    },
                    contextMenu: {
                        name: 'Convert to {{syllabary, lowercase}}',
                        error: `Couldn't get the selected element's name.`,
                    },
                },
            },
            fr: {
                translation: {
                    settings: {
                        title: 'Paramètres de conversion japonaise',
                        targetSyllabary: {
                            label: 'Syllabaire cible',
                            values: {
                                hiragana: 'Hiragana',
                                katakana: 'Katakana',
                                romaji: 'Romaji',
                            },
                        },
                        conversionMode: {
                            label: 'Mode de conversion',
                            values: {
                                normal: 'Normal',
                                spaced: 'Espacé',
                                okurigana: 'Okurigana',
                                furigana: 'Furigana',
                            },
                        },
                        romajiSystem: {
                            label: 'Système romaji',
                            values: {
                                nippon: 'Nippon',
                                passport: 'Passport',
                                hepburn: 'Hepburn',
                            },
                        },
                    },
                    contextMenu: {
                        name: 'Convertir en {{syllabary, lowercase}}',
                        error: `Impossible de récupérer le nom de l'élément sélectionné.`,
                    },
                },
            },
        },
    });

    i18next.services.formatter?.add('lowercase', (value, lng, options) => {
        return value.toLowerCase();
    });

    // Add settings menu
    new Spicetify.Menu.Item(i18next.t('settings.title'), false, () =>
        Spicetify.PopupModal.display({
            title: i18next.t('settings.title'),
            content: react.createElement(SettingsModal) as any,
            isLarge: true,
        })
    ).register();

    // Add context menu
    ServicesContainer.contextMenu.registerOrUpdate();
}

export default main;
