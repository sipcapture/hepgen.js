// HEPGEN-JS SETTINGS (please configure)
// ------------------------------------------------------

var opc = Math.random().toString(36).substring(4)
var dpc = Math.random().toString(36).substring(4)
var cic = Math.random().toString(36).substring(3)
var correlation = opc+':'+dpc+':'+cic

var config = {
        NAME: 'ISUP JSON',
        HEP_SERVER: '127.0.0.1',
        HEP_PORT: 9060,
        HEP_ID: '2001',
        HEP_AUTH: 'myHep',
        // the Messages to send
        MESSAGES: [
          {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 0x36,
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 0x36,
                          srcIp: '192.168.1.1',
                          dstIp: '192.168.1.2',
                          srcPort: 2905,
                          dstPort: 2905,
                          correlation_id: correlation
                  },
    		          pause: 1000,
                  payload: "{\"cic\":"+cic+",\"msg_type\":1,\"msg_name\":\"IAM\",\"nature_of_connnection\":{\"satellite\":0,\"satellite_name\":\"no satellite circuit in the connection\",\"continuity_check\":0,\"continuity_check_name\":\"continuity check not required\",\"echo_device\":1,\"echo_device_name\":\"outgoing echo control device included\"},\"forward_call\":{\"national_international_call\":0,\"national_international_call_name\":\"call to be treated as a national call\",\"end_to_end_method\":0,\"end_to_end_method_name\":\"no end-to-end method available (only link-by-link method available)\",\"interworking\":0,\"interworking_name\":\"no interworking encountered (No. 7 signalling all the way)\",\"end_to_end_information\":0,\"end_to_end_information_name\":\"no end-to-end information available\",\"isup\":1,\"isup_name\":\"ISDN user part used all the way\",\"isup_preference\":1,\"isup_preference_name\":\"ISDN user part not required all the way\",\"isdn_access\":0,\"isdn_access_name\":\"originating access non-ISDN\",\"sccp_method\":0,\"sccp_method_name\":\"no indication\"},\"calling_party\":{\"num\":10,\"name\":\"ordinary calling subscriber\"},\"transmission_medium\":{\"num\":3,\"name\":\"3.1 kHz audio\"},\"called_number\":{\"inn\":1,\"inn_name\":\"routing to internal network number not allowed\",\"ton\":3,\"ton_name\":\"national (significant) number\",\"npi\":1,\"npi_name\":\"ISDN (Telephony) numbering plan (ITU-T Recommendation E.164)\",\"num\":\"87486000F\"},\"calling_number\":{\"ni\":0,\"ni_name\":\"complete\",\"restrict\":0,\"restrict_name\":\"presentation allowed\",\"screened\":3,\"screened_name\":\"network provided\",\"ton\":3,\"ton_name\":\"national (significant) number\",\"npi\":1,\"npi_name\":\"ISDN (Telephony) numbering plan (ITU-T Recommendation E.164)\",\"num\":\"8182450866\"},\"user_information\":{\"coding_standard_name\":\"ITU-T standardized coding as described below\",\"coding_standard\":0,\"transfer_capability\":16,\"transfer_mode\":0,\"transfer_rate\":16,\"layer1_ident\":1,\"layer1_protocol\":3,\"transfer_capability_name\":\"3.1 kHz audio\",\"transfer_mode_name\":\"Circuit mode\",\"transfer_rate_name\":\"64 kbit\/s\",\"layer1_protocol_name\":\"G.711 a-law\"},\"opc\":"+opc+",\"dpc\":"+dpc+"}"
          },
          {
                // Session Log
                  rcinfo: {
                          type: 'HEP',
                          version: 3,
                          payload_type: 0x36,
                          captureId: '2001',
                          capturePass: 'myHep',
                          ip_family: 2,
                          protocol: 17,
                          proto_type: 0x36,
                          srcIp: '192.168.1.2',
                          dstIp: '192.168.1.1',
                          srcPort: 2905,
                          dstPort: 2905,
                          correlation_id: correlation
                  },
    		          pause: 1000,
                  payload: "{\"cic\":"+cic+",\"msg_type\":6,\"msg_name\":\"ACM\",\"opc\":"+opc+",\"dpc\":"+dpc+"}"
          },
      ]
};

// ------------------------------------------------------

module.exports = config;
