---
id: canned-message-plugin
title: Canned messages
sidebar_label: Canned messages
---
## About

The CannedMessage Plugin will allow you to send messages to the mesh network
from the device without using the phone app.
You can predefine text messages to choose from.

## Hardware

To navigate through messages and select one, you will require some
hardware attached to your device.
Currently, the plugin is tested with a generic rotary encoder, but this is
not a limitation further input methods can be added in the future.

### Rotary encoder

Meshtastic supports hardwired rotary encoders as input devices.
(Technically CannedMessage plugin is independent of rotary
encoders. It is described here, because no other module utilizes rotary encoders just yet.)

You will need a generic rotary encoder. The types listed below has five legs
where two is dedicated to a "press" action,
but any other types will likely do the job. You can also use a
three-legged version, where the "press" action should be wired from
an independent switch.

* [Amazon link](https://www.amazon.com/Rotary-Encoder-Washers-Digital-Potentiometer/dp/B07Y619CZR/ref=sr_1_21?keywords=rotary+encoder&qid=1642317807&sprefix=rotary+enco%2Caps%2C186&sr=8-21)
* [Amazon.DE link](https://www.amazon.de/-/en/sourcing-Degree-Rotary-Encoder-Digital/dp/B07RLZPX5K/ref=sr_1_12?keywords=rotary+encoder&qid=1642320025&sprefix=rotary%2Caps%2C105&sr=8-12)
* [Aliexpress link1](https://www.aliexpress.com/item/32992227812.html?spm=a2g0o.productlist.0.0.1afe21a50SLvi2&algo_pvid=a19c4182-08aa-406d-bfdf-132582ef5ebb&algo_exp_id=a19c4182-08aa-406d-bfdf-132582ef5ebb-23&pdp_ext_f=%7B%22sku_id%22%3A%2266940265509%22%7D&pdp_pi=-1%3B1.66%3B-1%3B-1%40salePrice%3BUSD%3Bsearch-mainSearch)
* [Aliexpress link2](https://www.aliexpress.com/item/32946444853.html?spm=a2g0o.productlist.0.0.1afe21a50SLvi2&algo_pvid=a19c4182-08aa-406d-bfdf-132582ef5ebb&aem_p4p_detail=2022011523263276283624312400022072680&algo_exp_id=a19c4182-08aa-406d-bfdf-132582ef5ebb-6&pdp_ext_f=%7B%22sku_id%22%3A%2266223434642%22%7D&pdp_pi=-1%3B1.91%3B-1%3B-1%40salePrice%3BUSD%3Bsearch-mainSearch)
* [Aliexpress link3](https://www.aliexpress.com/item/10000056483250.html?spm=a2g0o.productlist.0.0.1afe21a50SLvi2&algo_pvid=a19c4182-08aa-406d-bfdf-132582ef5ebb&algo_exp_id=a19c4182-08aa-406d-bfdf-132582ef5ebb-9&pdp_ext_f=%7B%22sku_id%22%3A%2220000000116682147%22%7D&pdp_pi=-1%3B2.51%3B-1%3B-1%40salePrice%3BUSD%3Bsearch-mainSearch)

Connect your rotary encoder as follows. The rotary encoder has two
rows of legs. One of the rows contains two legs, the other contains three
legs. Bottom side view:

      B o --- o PRESS
    GND o | |
      A o --- o GND

The two legs is to sense the press action (or push). Connect
one of the two to GROUND and the other to a GPIO pin. (No matter which one
goes where.) Let's call this connected ports 'PRESS'.

The three legs is to sense the rotation action. 
Connect the middle leg to GROUND and the ones on the side
to GPIO pins. Let's call these ports 'A' and 'B', according to
the scheme below.

    A   --||
    GND --||]========
    B   --||

Recommended GPIO pins for connecting a rotary encoder.

* TTGO LoRa V1:
  * A - GPIO-22
  * B - GPIO-23
  * PRESS - GPIO-21

There is a reference case 3D-design utilizing the rotary encoder for TTGO LoRa V1:
[Case for TTGO-ESP32-LORA-OLED-v1.0 with rotary encoder](https://www.thingiverse.com/thing:5178495)

### Configuration of the rotary encoder #1

    rotary1_enabled
        Enable the rotary encoder #1

    rotary1_pin_a
        GPIO pin for rotary encoder A port.

    rotary1_pin_b
        GPIO pin for rotary encoder B port.

    rotary1_pin_press
        GPIO pin for rotary encoder Press port.

    rotary1_event_cw
        Generate input event on CW of this kind.
        For using with CannedMessagePlugin you must choose value "UP" here!

    rotary1_event_ccw
        Generate input event on CCW of this kind.
        For using with CannedMessagePlugin you must choose value "DOWN" here!

    rotary1_event_press
        Generate input event on Press of this kind.
        For using with CannedMessagePlugin you must choose value "SELECT" here!

The rotary encoder #1 will send input events under name "rotEnc1".

## Configuration of the plugin

Following configuration can be set for the plugin.

    canned_message_plugin_enabled
        Enable/disable CannedMessagePlugin.

    canned_message_plugin_allow_input_source
        Input event origin accepted by the canned message plugin.
        Can be e.g. "rotEnc1" or keyword "_any"

    canned_message_plugin_messages
        Predefined messages for CannedMessagePlugin separated by '|' characters.

    canned_message_plugin_send_bell
        CannedMessagePlugin also sends a bell character with the messages.
        ExternalNotificationPlugin can benefit from this feature.

## Usage Notes

For setting up the rotary encoder #1 using the Python CLI you will
need to execute a sequence like this:

    meshtastic --set rotary1_pin_a 22
    meshtastic --set rotary1_pin_b 23
    meshtastic --set rotary1_pin_press 21
    meshtastic --set rotary1_event_cw KEY_UP
    meshtastic --set rotary1_event_ccw KEY_DOWN
    meshtastic --set rotary1_event_press KEY_SELECT
    meshtastic --set rotary1_enabled True

For setting up the plugin you will
need to execute a sequence like this:

    meshtastic --set canned_message_plugin_allow_input_source "_any"
    meshtastic --set canned_message_plugin_send_bell False
    meshtastic --set canned_message_plugin_enabled True

    meshtastic --set-canned-message "What am I doing?|I'm fine|Don't follow me|I'm out|I'm back|Need helping hand|Help me with saw|I need an alpinist|I need ambulance|Keep Calm|On my way|Need 5 mins|I will be late|I'm already waiting|I couldn't join|We have company|Beer is cold|Roger"

:::note
You can define up to 50 messages with a total length 800 bytes.
Use short texts as end of line will be truncated on the screen.
:::

:::note
The device must be restarted after the settings have been changed for the plugin to take effect.
:::

## Known Problems

* Rotary encoder input uses a technology called "interrupts". Using the
rotary encoder might cause unexpected software problems. This needs to be
tested.